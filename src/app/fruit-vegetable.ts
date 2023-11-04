export default interface FruitVegetable {
  type: string,
  name: string,
  origins: Origin[],
  picture: string
}

interface Origin {
  country: Country,
  months: number[]
}

interface Country {
  name: string,
  distanceFromUtrecht: number,
}
