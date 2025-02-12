import '../index.css';

export default function Bottom({ countDone, countExist }) {
    return (
        <div className="bottom">
            <label className="inf">Выполнено ({countDone})</label>
            <label className="inf">Не выполнено ({countExist})</label>
            <label className="inf">Всего ({countDone + countExist})</label>
        </div>
    );
}
