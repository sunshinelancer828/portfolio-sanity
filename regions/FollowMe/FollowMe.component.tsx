"use client"

import {
  AnimatePresence,
  motion,
  useInView
} from "framer-motion"
import React, { useRef } from "react"

import {
  Color,
  Social
} from "@/typings"
import { urlFor } from "@/sanity"

import { UserGroupIcon } from "@heroicons/react/24/solid"

import HeadingDivider from "@/components/App/HeadingDivider/HeadingDivider.component"
import Section from "@/components/App/Section/Section.component"
import SocialBox from "@/components/App/SocialBox/SocialBox.component"

import styles from "./FollowMe.module.scss"

type Props = {
  addSectionColor: boolean
  displayInNav: boolean
  dividerBackground: boolean
  heading: string
  menuUrl: string
  sectionColor?: Color
  socials: Social[]
}

export default function FollowMe({
  addSectionColor,
  displayInNav,
  dividerBackground,
  heading,
  menuUrl,
  sectionColor,
  socials
}: Props) {
  const dataPosition = displayInNav && menuUrl.length > 0 ? menuUrl : null

  const animatedWrapper = useRef(null)
  const isInViewWrapper = useInView(
    animatedWrapper, {
      once: true
    }
  )

  return (
    <AnimatePresence>
      <Section
        dataPosition={dataPosition}
      >
        <HeadingDivider
          background
          icon={<UserGroupIcon />}
          sectionColor={addSectionColor && !dividerBackground ? sectionColor?.hex : "#74c197"}
          title={heading}
        />
        <motion.div
          animate={isInViewWrapper ? {
            opacity: 1,
            y: 0
          } : {}}
          className={styles.wrapper}
          initial={{
            opacity: 0,
            y: 100
          }}
          ref={animatedWrapper}
          transition={{
            delay: 0.2,
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          {socials.map((social: Social) => (
            <SocialBox
              key={social._id}
              icon={urlFor(social?.icon).url()}
              primaryColor={social?.primaryColor.hex}
              secondaryColor={social?.secondaryColor.hex}
              title={social?.title}
              url={social?.url}
            />
          ))}
        </motion.div>
      </Section>
    </AnimatePresence>
  )
}
