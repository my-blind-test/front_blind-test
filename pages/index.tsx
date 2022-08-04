import styles from '../styles/Home.module.css'
import Link from 'next/link'
import HomeBar from '../components/HomeBar'
import ScoreBoard from '../components/ScoreBoard'
import { User } from '../utils/interfaces/User';
import { useEffect, useState } from 'react';
import api from "../utils/api"

export default function Home() {
  const [podium, setPodium] = useState<User[]>([]);

  useEffect(() => {
    const getPodium = async () => {

      const response = await api.get("/users/podium").catch((err) => {
        console.log(err)

        return undefined
      })

      if (!response.status)
        setPodium(response)
    }
    getPodium()
  }, [])

  return (
    <div className={styles.container}>
      <HomeBar />
      <h1>Home page</h1>
      <Link href="/lobby">
        Jouer
      </Link>
      <ScoreBoard data={podium} />
    </div>
  )
}