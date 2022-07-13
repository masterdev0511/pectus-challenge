import { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Papa from 'papaparse'
import NavBar from 'src/components/NavBar/NavBar'
import { Box, Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Container } from '../MainTable/styles'

export const AmountTable = () => {
  const [data, setData] = useState<Array<Array<string>>>([])
  const [header, setHeader] = useState<Array<string>>([])
  const [id, setId] = useState(0)

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

  const getDataByGroup = () => {
    let items = data.map(item => item[id])
    items = items.filter((item, index) => index === items.indexOf(item))
    const getSum = (str: string) => {
      const subdataById = data.filter(item => item[id] === str)
      const amountValues = subdataById.map(item =>
        Number(item[2].slice(0, item[2].indexOf('.')).replace(',', '')),
      )
      return amountValues.reduce((total, v) => total + v)
    }
    const amountByItem = items.map(item => getSum(item))
    return items.map((item, index) => [item, amountByItem[index]])
  }

  const getTotalAmount = () => {
    const amountValues = data.map(item =>
      Number(item[2].slice(0, item[2].indexOf('.')).replace(',', '')),
    )
    return amountValues.reduce((total, v) => total + v)
  }

  return (
    <Container>
      <NavBar />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          p: 2,
        }}
      >
        <Typography variant="h6" sx={{ p: 2 }}>
          Total Expanses by:
        </Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <Select
            value={id}
            onChange={e => setId(Number(e.target.value))}
            sx={{ textTransform: 'capitalize' }}
          >
            {header.map((item, index) => (
              <MenuItem
                value={index}
                sx={{
                  textTransform: 'capitalize',
                  display: index === 2 ? 'none' : 'block',
                }}
              >
                {item.replace('_', ' ')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {data.length && (
        <TableContainer component={Paper} sx={{ width: '80%', marginY: 5 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
                >
                  {header[id].replace('_', ' ')}
                </TableCell>
                <TableCell />
                <TableCell
                  sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
                >
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getDataByGroup().map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row[0]}
                  </TableCell>
                  <TableCell />
                  <TableCell>{row[1].toLocaleString()}€</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell />
                <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  {getTotalAmount().toLocaleString()}€
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  )
}
