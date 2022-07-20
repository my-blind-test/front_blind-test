import styles from '../styles/Home.module.css'
import Link from 'next/link'
import HomeBar from '../components/HomeBar'

export default function Home() {
  return (
    <div className={styles.container}>
      <HomeBar />
      <h1>Home page</h1>
      <Link href="/lobby">
        Jouer
      </Link>
      <p>{"Pour l'instant il n'y a pas grand chose mais à terme il y aura :"}</p>
      <ul>
        <li>{"Une fake partie qui tounne"}</li>
        <li>{"Un super score board"}</li>
        <li>{"Une explication des règles"}</li>
        <li>{"Une explication de l'univers"}</li>
      </ul>
    </div>
  )
}