import { Scroll } from './components/AnimeScroll'
import PopularAnime from './animeCategory/page'
import HighRatedAnime from './components/HighRated'
// import { NowPlaying } from './components/NowPlaying'

export default function Page() {
  return (
    <div>
        <Scroll/>   
        <PopularAnime/>
        {/* <HighRatedAnime/> */}
        {/* <NowPlaying/> */}
    </div>
  )
}
