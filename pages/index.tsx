import styles from "../styles/landing.module.css"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"
import Image from "next/image"
import { Button } from "react-bootstrap"

export default function Home() {

  useEffect(() => {
    // registering gsap plugins
    gsap.registerPlugin(ScrollTrigger)
    gsap.registerPlugin(ScrollToPlugin)

    // border animation
    gsap.from(
      `.${styles["border-image"]}`,
      {
        opacity: "0",
        repeat: -1,
        yoyo: true
      }
    )

    // paper animation
    const paperTimeline = gsap.timeline({});
    paperTimeline
      .from(`.${styles["paper-lines"]}`, { width: 0, stagger: 0.2, })
      .from(`.${styles["paper-mark"]}`, { fontSize: 0, duration: 0.5, opacity: 0, ease: "back" })

    function goToSlide(index: number) {
      gsap.to(window, {
        scrollTo: { y: index * window.innerHeight, autoKill: false },
        duration: 1,
        ease: "expo"
      })
    }

    gsap.utils.toArray(`.slide-container`).forEach((slide: any, i) => {
      ScrollTrigger.create({
        trigger: slide,
        onEnter: () => goToSlide(i)
      })
      ScrollTrigger.create({
        trigger: slide,
        start: "bottom bottom",
        onEnterBack: () => goToSlide(i)
      })
    });

    const slide2Timeline = gsap.timeline({ scrollTrigger: "#slide2Title" });
    slide2Timeline.from("#slide2Title, #paragraph2", { y: "120%", opacity: "0", duration: "1", })
      .from("#windowFrame", { y: "10%", opacity: "0", duration: "0.7", })
      .from("#sideBar", { x: "-50%", duration: "0.8" }, "<")
      .from("#windowContent", { y: "10%", opacity: "0", duration: "1" }, "<0.2")
  }, [])

  return (
    <div className="sections-container">
      <section className="slide-container">
        <div className={`${styles["intro-slide-container"]}`}>
          <div className={`${styles["intro-left-pan"]}`}>
            <h1 style={{ color: "#343A40", fontWeight: 700 }}>Leon</h1>
            <p style={{color: "#343A40", fontSize:"1.1rem"}}>Leon is a focused online system that provides secure examination system and efficient lectures hosting</p>
            <Button style={{ width: "50%" }}>Get started</Button>
          </div>
          <div className={`${styles["intro-right-pan"]}`}>
            <div className={`${styles["image-elements"]} ${styles["image-container"]}`}>
              <Image src="/girl.svg" alt="abstract-girl" width={200} height={200} layout="intrinsic" className={`${styles["girl-image"]}`} />
              <div className={` ${styles["border-image"]}`}>
                <Image src="/border.svg" alt="border" width={200} height={200} layout="intrinsic" />
              </div>
            </div>
            <div className={`${styles["paper"]}`}>
              <div className={`${styles["paper-lines"]}`} style={{ backgroundColor: "#00000055" }} ></div>
              <div className={`${styles["paper-lines"]}`}></div>
              <div className={`${styles["paper-lines"]}`}></div>
              <div className={`${styles["paper-lines"]}`} style={{ width: "40%" }}></div>
              <br />
              <div className={`${styles["paper-lines"]}`} style={{ width: "60%", backgroundColor: "#00000055" }}></div>
              <div className={`${styles["paper-lines"]}`}></div>
              <div className={`${styles["paper-lines"]}`}></div>
              <div className={`${styles["paper-lines"]}`} style={{ width: "40%" }}></div>
              <div className={`${styles["paper-lines"]}`}></div>
              <div className={`${styles["paper-lines"]}`}></div>
              <div className={`${styles["paper-mark"]}`}> <i className="bi bi-check"></i> </div>
            </div>
          </div>
        </div>
      </section>
      <section className="slide-container">
        <h3 id="slide2Title" className={`${styles["slide-title"]}`}>Easy to navigate interface</h3>
        <p id="paragraph2" className={`${styles["paragraph"]}`}>With our easy to use nav bar you can navigate all our features, because our service is small and focused we could fit it all into a simple navbar.</p>
        <div className={`${styles["window-frame"]}`} id="windowFrame">
          <div className={`${styles["window-bar"]}`}>
            <div className={`${styles["url"]}`}>
              https://leon.io
            </div>
            <div className={`${styles["control"]}`}>
              <span>{" "}</span>
              <span>{" "}</span>
              <span>{" "}</span>
            </div>
          </div>
          <div className={`${styles["window-content"]}`}>
            <div id="sideBar" className={`${styles["side-bar"]} bg-dark`}></div>
            <div id="windowContent" className={`${styles["content"]}`}>
              <div className={`${styles["text-mock-heading"]}`}></div>
              <div className={`${styles["text-mock-paragraph-line"]}`}></div>
              <div className={`${styles["text-mock-paragraph-line"]}`}></div>
              <div className={`${styles["text-mock-paragraph-line"]}`}></div>
              <br />
              <div className={`${styles["text-mock-heading"]}`}></div>
              <div className={`${styles["text-mock-paragraph-line"]}`}></div>
              <div className={`${styles["text-mock-paragraph-line"]}`}></div>
              <div className={`${styles["text-mock-paragraph-line"]}`}></div>
              <div className={`${styles["text-mock-paragraph-line"]}`}></div>
              <div className={`${styles["text-mock-paragraph-line"]}`}></div>
              <div className={`${styles["text-mock-paragraph-line"]}`}></div>
              <div className={`${styles["buttons-container"]}`}>
                <i className="bi bi-check"></i>
                <i className="bi bi-x"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="slide-container">
        <h3 id="slide3Title" className={`${styles["slide-title"]}`}>Designed with integration in mind</h3>
        <p id="paragraph3" className={`${styles["paragraph"]}`}></p>
      </section>
    </div>
  )
}
