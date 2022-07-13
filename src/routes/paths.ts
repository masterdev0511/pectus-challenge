import { lazy } from 'react'

export const MainTable = lazy(() =>
  import('src/pages/MainTable/MainTable').then(module => ({
    default: module.MainTable,
  })),
)
export const AmountTable = lazy(() =>
  import('src/pages/AmountTable/AmountTable').then(module => ({
    default: module.AmountTable,
  })),
)
export const GenericNotFound = lazy(() =>
  import('src/pages/GenericNotFound/GenericNotFound').then(module => ({
    default: module.GenericNotFound,
  })),
)
