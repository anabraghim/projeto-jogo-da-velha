import './styles.css'

export interface CardProps { /**/
    id: string;
    flipped?: boolean;
    back: string;
    onClick?: (id: string) => void;
}
//define uma interface, ou seja, a estrutura de um objeto CardProps

export default function Card({flipped = false, back, onClick, id}: CardProps /*disse que a função recebe um objeto que tem como o valor da propriedade flipped o false por padrão*/){
    const cardContentClassNames = ['cardContent'];
    // fiz uma lista com o primeiro valor sendo a string cardContent

    flipped && cardContentClassNames.push('cardContent-flipped');
    //se o flipped for true adicione o cardContent-flipped na lista de nomes de classes

    const onClickFn = (id:string) => {
        if(onClick){
            onClick(id);
        }
    }
     return(
         <div className='card' onClick={() => onClickFn(id)}>
             <div className={cardContentClassNames.join(' ')}>
                {/* transforma a lista em uma string separada pelo caractere espaço */}
                 <div className="cardFace cardFace-Front ">?</div>
                 <div className="cardFace cardFace-Back ">{back}</div>
             </div>       
         </div>
     );
}