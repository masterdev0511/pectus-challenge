import { Suspense } from 'react'
import {
  Navigate,
  Route,
  Routes as RoutesReactRouterDom,
} from 'react-router-dom'
import { MainTable, AmountTable, GenericNotFound } from './paths'

export const Routes = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RoutesReactRouterDom>
        <Route path="/" element={<MainTable />} />
        <Route path="/amount" element={<AmountTable />} />

        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<GenericNotFound />} />
      </RoutesReactRouterDom>
    </Suspense>
  )
}
