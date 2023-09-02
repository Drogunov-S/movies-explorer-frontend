import './Main.css';

function Main({children, className}) {
    return (
        <main className={`main ${className}`}>
            {children}
        </main>
    );
}

export default Main;
