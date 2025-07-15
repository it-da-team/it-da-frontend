import React, { useState } from "react";
import FavoriteButton from '../../../components/com/FavoriteButton';

// 채용공고 헤드 
// 본문
function CompanyInfoHeader({title, companyName, isFavorite = false, onFavoriteToggle}){
    // 안전한 기본값: 항상 Promise를 반환하는 함수
    const safeOnFavoriteToggle = onFavoriteToggle || (async () => {});
    const [hover, setHover] = useState(false);
    return(
        <div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div>
                    <h2 style={{margin: 0}}>{title}</h2>
                    <h4 style={{margin: '1.5rem 0 0 0', fontWeight: 400}}>{companyName}</h4>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>
                    <FavoriteButton
                        initialFavorite={isFavorite}
                        onToggle={safeOnFavoriteToggle}
                        lottieSrc="https://lottie.host/eb195dde-1eb6-4032-b4e8-8dcb4c2f810e/xZfDm20WdP.lottie"
                    />
                    <span
                        style={{
                            fontSize: '1rem',
                            color: '#e74c3c',
                            fontWeight: 700,
                            userSelect: 'none',
                            marginLeft: '0.6rem',
                            lineHeight: 1.2,
                            position: 'relative',
                            top: '0.5rem',
                            background: '#fff0f4',
                            borderRadius: '12px',
                            padding: '0.15rem 0.8rem 0.15rem 0.6rem',
                            border: '1px solid #ffe0e0',
                            boxShadow: '0 1px 6px #ffd6d633',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            transition: 'transform 0.15s',
                            transform: hover ? 'scale(1.10)' : 'scale(1)'
                        }}
                        onMouseOver={() => setHover(true)}
                        onMouseOut={() => setHover(false)}
                    >
                        <span style={{fontSize: '1.1em', marginRight: '0.1em'}}></span>관심
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CompanyInfoHeader