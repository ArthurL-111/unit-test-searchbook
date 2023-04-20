import React from "react";

const Booklist = ({ list = [], onClickBook , onClickPrev, onClickNext, currentPage, totalPages }) => {
    return (
        <div className="booklist">
            <div className="pagination-container"><button onClick={onClickPrev}>prev</button>{currentPage}/{totalPages}<button onClick={onClickNext}>next</button></div>
            <ul>
                {list.length === 0 ? <span>Nothing here</span> : list.map((item) => {
                    const {
                        title,
                        author,
                        publisher,
                        description,
                        imageLinks: { thumbnail }={},
                    } = item.volumeInfo;
                    return (
                        <li key={item.id} className="list-item" onClick={e=>onClickBook(item)}>
                            <div>
                              <img alt={title??"thumbnail"} src={thumbnail??""}/>
                            </div>
                            <div>
                                <div><strong>title: </strong><span>{title??"N/A"}</span></div>
                                <div><strong>author: </strong><span>{author??"N/A"}</span></div>
                                <div><strong>publisher: </strong><span>{publisher??"N/A"}</span></div>
                                <div><strong>description: </strong><span>{description??"N/A"}</span></div>
                            </div>
                        </li>
                    );
                })}
            </ul>
            
        </div>
    );
};

export default Booklist;
