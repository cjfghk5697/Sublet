const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderBottom: '1px solid black',
    marginBottom: '2em',
    width: '100%',
  },
}

export default function Header() {
  return (
    <div style={styles.container}>
      <h1>Header!!</h1>
    </div>
  );
}