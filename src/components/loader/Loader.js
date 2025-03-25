"use client";
import React from "react";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loaderBar} />
    </div>
  );
};

export default Loader;
