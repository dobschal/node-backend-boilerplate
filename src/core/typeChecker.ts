export function expectStringProps (object: any, props: string[]): void {
  for (const prop of props) {
    if (typeof object[prop] !== 'string' || (object[prop] as string).length === 0) {
      throw new Error('400: Expect string ' + prop)
    }
  }
}
