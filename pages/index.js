import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Test_component from '../componets/test_component'
export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Hello bootstrap in nextjs</h1>
      <button className="btn btn-primary"> clc me</button>
      <br />
      <Test_component />
    </div>
  )
}
