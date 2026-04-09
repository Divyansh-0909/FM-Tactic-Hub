import './EditionDetailView.css';
import { tacticsData } from './tacticData';
import TacticPreviewList from './TacticPreviewList';

function EditionDetailView(prop){
    // const data = tacticsData.find((t) => t.name === 'Football Manager 24');
    return (
        <>
            <div className={`detialed-view`}>
                <h2 className='version-title'>{prop.data?.name}</h2>
                <div className='card-Collection'>
                    <TacticPreviewList prop={{n: prop.data.arr.length, isVersion: true, arr: prop.data?.arr || [] }} />
                </div>
            </div>
        </>
    )
}

export default EditionDetailView;