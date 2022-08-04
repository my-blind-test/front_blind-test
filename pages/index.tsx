import styles from '../styles/Home.module.css'
import Link from 'next/link'
import HomeBar from '../components/HomeBar'
import ScoreBoard from '../components/ScoreBoard'

export default function Home() {
  return (
    <div className={styles.container}>
      <HomeBar />
      <h1>Home page</h1>
      <Link href="/lobby">
        Jouer
      </Link>
      <ScoreBoard />
    </div>
  )
}