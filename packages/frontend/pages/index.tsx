import styles from './index.module.css';

function Index(): JSX.Element {
    return (
        <div className={styles.page}>
            <div className="wrapper">
                <div className="container">
                    <div id="welcome">
                        <h1>
                            <span> Hello there, </span>
                            Welcome frontend 👋
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;
