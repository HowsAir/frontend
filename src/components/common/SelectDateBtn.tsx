interface SelectDateBtnProps {
    onClick: () => void;
}

const SelectDateBtn: React.FC<SelectDateBtnProps> = ({ onClick }) => {
    return (
        <div
            className="absolute left-40 top-16 z-10 inline-block"
            style={{
                ['--expand-width' as string]: '180px',
                ['--initial-width' as string]: '38px',
                ['--transition-time' as string]: '0.3s',
            }}
        >
            <style>{`
        .expand-button {
          display: flex;
          align-items: center;
          background-color: #4074E7;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px;
          cursor: pointer;
          transition: all var(--transition-time) ease;
          width: var(--initial-width);
          overflow: hidden;
        }

        .expand-button:hover {
          width: var(--expand-width);
          background-color: #4074E7;
        }

        .button-text {
          white-space: nowrap;
          opacity: 0;
          width: 0;
          transition: all var(--transition-time) ease;
          margin-left: 0;
        }

        .expand-button:hover .button-text {
          opacity: 1;
          width: auto;
          margin-left: 8px;
        }
      `}</style>
            <button className="expand-button" onClick={onClick}>
                <img src="../../../public/icons/Calendar.svg" />
                <span className="button-text">Seleccionar fecha</span>
            </button>
        </div>
    );
};

export default SelectDateBtn;
