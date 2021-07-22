import * as React from 'react'
import CometStyleXSheet from '@ladifire-opensource/stylex-theme'

import { themeDataBase } from '../styles/theme/themeDataBase'
import { themeDataCustom } from '../styles/theme/themeDataCustom'

export const useTheming = () => {
  React.useEffect(() => {
    CometStyleXSheet.rootStyleSheet.setRootTheme(themeDataBase)
    CometStyleXSheet.rootStyleSheet.setCustomTheme(themeDataCustom)
  }, [])

  const [isDark, setIsDark] = React.useState<boolean>(() => false)
  const toggleIsDark = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { target } = event
      setIsDark(target.checked)
      CometStyleXSheet.rootStyleSheet.toggleCustomTheme(!isDark)
    },
    [isDark, setIsDark]
  )

  return { isDark, toggleIsDark }
}
