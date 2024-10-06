import viteLogo from '/vite.svg';
import Image from "react-bootstrap/Image";

export function HomeCarouselImage({text}){

  return(
    <div style={{
      backgroundColor:"lightgreen", 
      width:"300", 
      height:"200"}}>
       <Image src={`https://picsum.photos/seed/${text}/200/300`} />
    </div>
  )
}