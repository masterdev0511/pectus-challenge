import { render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { MainTable } from 'src/pages/MainTable/MainTable'

describe('MainTable Page', () => {
  it('should render correcty', () => {
    const component = renderer.create(<MainTable />)

    expect(component).toMatchSnapshot()
  })
  it('should be able to render MainTable', () => {
    render(<MainTable />)

    expect(screen.getByText(/Main/i)).toBeInTheDocument()
    expect(screen.getByText(/Amount/i)).toBeInTheDocument()
  })
})
