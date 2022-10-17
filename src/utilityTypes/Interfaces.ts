interface Interfaces {
    firstName: string
    lastName: string
    age: number
}

interface OptionalPerson {
    firstName?: string
    lastName?: string
    age?: number
}

interface Character {
    id: number
    name: string
    age: number
}

interface Todo {
    title: string
    description: string
    completed: boolean
}

export {
    Interfaces,
    OptionalPerson,
    Character,
    Todo,
}