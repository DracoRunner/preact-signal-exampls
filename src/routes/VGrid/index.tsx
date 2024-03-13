import styles from './style.module.css';

const getRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};

const colData = Array.from({ length: 20 }, (_, index) => {
  return {
    title: Math.floor(Math.random() * 100),
  };
});

const rowData = Array.from({ length: 20 }, (_, index) => {
  return {
    title: getRandomString(3),
  };
});

const getColumns = (rowIndex: number) => {
  return colData.map((_, index) => {
    const childStyle = {
      transform: `translate(${index * 200 + index * 10}px, 0px)`,
    };
    return (
      <div key={`${rowIndex}_${index}_${_.title}`} className={styles.col} style={childStyle}>
        {`${rowIndex}:${_.title}`}
      </div>
    );
  });
};

const getRow = () => {
  return rowData.map((_, index) => {
    const rowStyle = {
      transform: `translate(0px,${index * 300 + index * 10}px)`,
    };
    console.log('rowStyle', rowStyle);

    return (
      <div key={`${index}:${_.title}`} className={styles.row} style={rowStyle}>
        <span>{_.title}</span>
        {getColumns(index)}
      </div>
    );
  });
};

export default () => {
  return <div className={styles.parent}>{getRow()}</div>;
};
