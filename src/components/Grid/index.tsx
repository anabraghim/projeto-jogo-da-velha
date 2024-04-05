import { useRef, useState } from "react";
import Card, { CardProps } from "../Card";
import './styles.css'
import { duplicateRegenerateSortArray } from "../../utils/card-utils";

export interface GridProps{
    cards: CardProps[];
}
export function Grid({cards}:GridProps){
    const [stateCards, setStateCards] = useState(() => {
        return duplicateRegenerateSortArray(cards)
    })

    const first = useRef<CardProps | null>(null);
    const second = useRef<CardProps | null>(null);
    const unflip = useRef(false); //desvira
    const [moves, setMoves] = useState(0);
    const [matches, setMatches] = useState(0);
    // vantagem do ref ao invés do useState, ele não renderiza novamente se muda algo

    const handleClickId = (id:string) => {
        const newStateCards = stateCards.map((card) => {
            // se o id do cartão não for igual ao id clicado, nao faz nada
            if(card.id !== id){
                return card;
            }
            //se o cartão já está virado, nao faz nada
            if(card.flipped == true){
                return card;
            }
            // se os dois estiverem virados, preciso comparar eles
            if(unflip.current && first.current && second.current){ //se desvira for verdadeiro
                first.current.flipped = false;
                first.current = null;
                second.current.flipped = false;
                second.current = null;
                unflip.current = false;
            }
            //virar cartão
            card.flipped = true;
            

            //configuração do primeiro e do segundo cartão virado
            if(first.current === null){
                first.current = card; //se nenhum estiver virado
            } else if(second.current === null){
                second.current = card; // se só um estiver virado
                setMoves((moves) => moves + 1);
            }

            //se os dois cartões estiverem virados
            if(first.current && second.current){
                if(first.current?.back == second.current?.back){
                    first.current = null;
                    second.current = null;
                    setMatches((matches) => matches + 1);
                } else{
                    unflip.current = true;
                }
            }

           return card;
        });
                
        setStateCards(newStateCards);
    }

  
    return (
        <>
        <div className='textos'>Movimentos: {moves}  |  Acertos: {matches}</div>
        {/* /*A key é usada para identificar qual item em uma lista foi alterado, adicionado ou removido. */}
        <div className="grid">
            {stateCards.map((card) =>{
                return <Card {...card} key={card.id} onClick={handleClickId}/>
            })}
        </div>
        </>
    )
}