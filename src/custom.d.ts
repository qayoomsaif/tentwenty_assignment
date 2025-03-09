declare module '*.svg' {
  import { ReactElement, SVGProps } from 'react'
  const content: (props: React.SVGProps<SVGSVGElement>) => ReactElement
  export default content
}
declare module '*.png' {
  import React = require('react')
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: any
  export default src
}

declare module 'react-native-image-to-pdf' {
  const RNImageToPdf: any
  export default RNImageToPdf
}
declare module 'react-native-snap-carousel' {
  import Carousel from 'react-native-snap-carousel'
  export default Carousel
}
