import { FormEvent, useEffect, useState } from 'react';
import DiceIcon from '../../assets/images/icon-dice.svg';
import DividerIconDesktop from '../../assets/images/pattern-divider-desktop.svg';
import DividerIconMobile from '../../assets/images/pattern-divider-mobile.svg';
import styles from './AdviceCard.module.css';

type AdviceData = {
  id: number;
  content: string;
};

export function AdviceCard() {
  const [advice, setAdvice] = useState<AdviceData>({} as AdviceData);

  function loadNewAdvice() {
    const URL = `https://api.adviceslip.com/advice`;

    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        const newAdvice = {
          id: data.slip.id,
          content: data.slip.advice,
        };

        setAdvice(newAdvice);
      });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    loadNewAdvice();
  }

  useEffect(() => {
    const initialAdvice = {
      id: 117,
      content:
        "It is easy to sit up and take notice, what's difficult is getting up and taking action.",
    };

    setAdvice(initialAdvice);
  }, []);

  return (
    <div className={styles.Card}>
      <header className={styles.Card__Header}>
        <h1 className={styles.Card__Title}>Advice #{advice.id}</h1>
      </header>

      <main className={styles.Card__Content}>
        <blockquote>“{advice.content}”</blockquote>
      </main>

      <img
        src={DividerIconDesktop}
        alt="A division between the new advice and advice button"
        className={`${styles.Card__Divider} ${styles['Card__Divider--show-desktop']}`}
      />

      <img
        src={DividerIconMobile}
        alt="A division between the new advice and advice button"
        className={`${styles.Card__Divider} ${styles['Card__Divider--show-mobile']}`}
      />

      <footer className={styles.Card__Footer}>
        <form
          onSubmit={handleSubmit}
          data-testid="change-advice"
          className={styles.Card__Form}
        >
          <button
            type="submit"
            className={`${styles.Card__Submit} ${styles['Card__Submit--state-hover']}`}
          >
            <img src={DiceIcon} alt="Ask for new advice button icon" />
          </button>
        </form>
      </footer>
    </div>
  );
}
