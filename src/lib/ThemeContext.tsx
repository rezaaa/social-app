import React, {createContext, useContext, useMemo} from 'react'
import {TextStyle, useColorScheme, ViewStyle} from 'react-native'
import {darkTheme, defaultTheme} from './themes'

export type ColorScheme = 'light' | 'dark'

export type PaletteColorName =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'inverted'
  | 'error'
export type PaletteColor = {
  background: string
  backgroundLight: string
  text: string
  textLight: string
  textInverted: string
  link: string
  border: string
  borderDark: string
  icon: string
  [k: string]: string
}
export type Palette = Record<PaletteColorName, PaletteColor>

export type ShapeName = 'button' | 'bigButton' | 'smallButton'
export type Shapes = Record<ShapeName, ViewStyle>

export type TypographyVariant =
  | '2xl-thin'
  | '2xl'
  | '2xl-medium'
  | '2xl-bold'
  | '2xl-heavy'
  | 'xl-thin'
  | 'xl'
  | 'xl-medium'
  | 'xl-bold'
  | 'xl-heavy'
  | 'lg-thin'
  | 'lg'
  | 'lg-medium'
  | 'lg-bold'
  | 'lg-heavy'
  | 'md-thin'
  | 'md'
  | 'md-medium'
  | 'md-bold'
  | 'md-heavy'
  | 'sm-thin'
  | 'sm'
  | 'sm-medium'
  | 'sm-bold'
  | 'sm-heavy'
  | 'xs-thin'
  | 'xs'
  | 'xs-medium'
  | 'xs-bold'
  | 'xs-heavy'
  | 'title-2xl'
  | 'title-xl'
  | 'title-lg'
  | 'title'
  | 'title-sm'
  | 'post-text-lg'
  | 'post-text'
  | 'button'
  | 'button-lg'
  | 'mono'
export type Typography = Record<TypographyVariant, TextStyle>

export interface Theme {
  colorScheme: ColorScheme
  palette: Palette
  shapes: Shapes
  typography: Typography
}

export interface ThemeProviderProps {
  theme?: ColorScheme
}

export const ThemeContext = createContext<Theme>(defaultTheme)

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
}) => {
  const colorSchemeFromRN = useColorScheme()

  // if theme is 'system', use the device's configured color scheme
  let colorScheme = theme === 'system' ? colorSchemeFromRN : theme

  const value = useMemo(
    () => (colorScheme === 'dark' ? darkTheme : defaultTheme),
    [colorScheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
