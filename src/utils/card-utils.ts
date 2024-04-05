import { CardProps } from "../components/Card";

export const duplicateArray = <T>(array: T[]): T[] => {
    return [...array, ...array];
}
// T[] depois do parâmetro indica que T retorna um array do tipo T
// o tipo T é genérico, ou seja, pode ser de qualquer tipo

export const sortArray = <T>(array: T[]): T[] => {
    return array.sort(() => Math.random() - 0.5)
}

// o sort ele precisa receber uma função de comparação, ele
//fica comparando dois números, quando o resultado da função da
//negativo ele mantém a ordem, quando dá positivo ele inverte a ordem


export const keyGen = (): string => {
    return(
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    )
}
//Os símbolos utilizados na base 36 são os 10 dígitos arábicos (0-9) e as 26 letras do alfabeto latino (a-z).


export const regenerateCard = (cards: CardProps[]) : CardProps[] =>{
    return cards.map((card) => ({...card, id: keyGen()}))
}

//.map é uma função que aplica determinada função a cada um dos elementos
//do array. No final, retorna um novo array com os resultados

export const duplicateRegenerateSortArray = (card: CardProps[]): CardProps[] => {
    return sortArray(regenerateCard(duplicateArray(card)))
}
