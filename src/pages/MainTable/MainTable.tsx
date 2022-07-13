import { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import Papa from 'papaparse'
import NavBar from 'src/components/NavBar/NavBar'
import { Container } from './styles'

type Order = 'asc' | 'desc'

export const MainTable = () => {
  const [data, setData] = useState<Array<Array<string>>>([])
  const [header, setHeader] = useState<Array<string>>([])
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState(-1)

  useEffect(() => {
    Papa.parse('/expanses.csv', {
      download: true,
      complete(input: { data: Array<Array<string>> }) {
        const records = input.data
        setHeader(records[0])
        setData(records.slice(1))
      },
    })
  }, [])

  const handleSort = (index: number) => {
    if (index === orderBy) {
      setOrder(order === 'asc' ? 'desc' : 'asc')
    } else {
      setOrderBy(index)
      setOrder('asc')
    }
  }

  const sortedData = () => {
    if (orderBy === -1) return data
    const orderValue = {
      asc: 1,
      desc: -1,
    }
    const getNumber = (str: string) =>
      Number(str.slice(0, str.indexOf('.')).replace(',', ''))
    return data.sort((a, b) => {
      if (orderBy === 2)
        return order === 'asc'
          ? getNumber(a[orderBy]) - getNumber(b[orderBy])
          : getNumber(b[orderBy]) - getNumber(a[orderBy])
      if (orderBy === 3)
        return order === 'asc'
          ? +new Date(a[orderBy]) - +new Date(b[orderBy])
          : +new Date(b[orderBy]) - +new Date(a[orderBy])
      return a[orderBy] > b[orderBy] ? orderValue[order] : -orderValue[order]
    })
  }

  return (
    <Container>
      <NavBar />
      {data.length && (
        <TableContainer component={Paper} sx={{ width: '80%', marginY: 5 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {header.map((item, index) => (
                  <TableCell
                    key={index}
                    align={index === 1 ? 'center' : 'left'}
                    sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
                    sortDirection={orderBy === index ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === index}
                      direction={orderBy === index ? order : 'asc'}
                      onClick={() => handleSort(index)}
                    >
                      {item.replace('_', ' ')}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData().map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row[0]}
                  </TableCell>
                  <TableCell align="center">{row[1]}</TableCell>
                  <TableCell>{row[2]}</TableCell>
                  <TableCell>{row[3]}</TableCell>
                  <TableCell>{row[4]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  )
}
