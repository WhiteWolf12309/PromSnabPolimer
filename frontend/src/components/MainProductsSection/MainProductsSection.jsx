
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { endpoints } from '../../api/index';
import TypeColumn from '../../components/Icons/ProductItemsVisualTypes/Type-column/Type-column';
import TypeRow from '../../components/Icons/ProductItemsVisualTypes/Type-row/Typerow';
import BusketItem from '../BusketItem/BusketItem';
import FilterCheckboxes from '../FilterCheckboxes/FilterCheckboxes';
import FilterInputs from '../FilterInputs/FilterInputs';
import Loader from '../Loader/Loader';

import PaginationArrow from '../../assets/images/pagination-arrow.svg';

import './MainProductsSection.scss';

import ProductItemImgExample from '../../assets/images/product-item-example.jpg';
import Search from '../../assets/images/search-btn.svg';


const Pagination = ({ paginationPage, setPaginationPage, paginationPagesLimit }) => {

    return (
        <div className="pagination">
            <div className="pagination__inner">

                
                <button disabled={paginationPage <= 2} style={{ opacity: (paginationPage <= 2 ? "0.6" : "1") }} className="pagination__inner-item" onClick={() => setPaginationPage(prev => prev - 2)}>
                    <img className='item' src={PaginationArrow} alt="Назад" />
                </button>
                
                {paginationPage - 1 !== 0 && (
                    <div className="pagination__inner-item" onClick={() => setPaginationPage(prev => prev - 1)}>{paginationPage - 1}</div>
                )}
                
                <div className="pagination__inner-item active">{paginationPage}</div>

                {paginationPagesLimit !== paginationPage && (
                    <div className="pagination__inner-item" onClick={() => setPaginationPage(prev => prev + 1)}>{paginationPage + 1}</div>
                )}  
                
                {paginationPage - 1 === 0 && (
                    <div className="pagination__inner-item" onClick={() => setPaginationPage(prev => prev + 1)}>{paginationPage + 2}</div>
                )}

                <button disabled={paginationPage === paginationPagesLimit} style={{ opacity: (paginationPage === paginationPagesLimit ? "0.6" : "1") }} className="pagination__inner-item" onClick={() => setPaginationPage(prev => prev + 1)}>
                    <img className='item' src={PaginationArrow} style={{ transform: 'rotate(180deg)' }} alt="Вперёд" />
                </button>
            </div>
        </div>
    )
}




const MainProductsSection = () => {

    const [productItems, setProductItems] = useState()
    const [filteredProductItems, setFilteredProductItems] = useState()

    const newFilteredProductItems = useRef([])

    const [filterDataStatus, setFilterDataStatus] = useState(false)

    const [searchInputValue, setSearchInputValue] = useState('')
    const [inputValue, setInputValue] = useState({ from: '', to: '' })
    const [diameter, setDiameter] = useState()
    const [productType, setProductType] = useState()
    const [material, setMaterial] = useState()
    const [length, setLength] = useState()
    const [filterList, setFilterList] = useState({
        diameters: [],
        lengths: [],
        productsTypes: [],
        materials: []
    })

    const [paginationPage, setPaginationPage] = useState(1)
    const [paginationPagesLimit, setPaginationPagesLimit] = useState(0)

    const [visualTypes, setVisualTypes] = useState({ column: true, row: false })


    // diameter, productType, material, length, inputValue.from, inputValue.to

    const getFilterData = async () => {
        await axios.get(endpoints.FILTERED_DATA)
        .then(res => {
            setFilterDataStatus(false)
            console.log(res.data)
            setDiameter(res.data.diameter)
            setProductType(res.data.productType)
            setMaterial(res.data.material)
            setLength(res.data.length)
            setFilterDataStatus(true)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getProductItems = async () => {
        await axios.get(endpoints.PRODUCT_ITEMS + `/${paginationPage}`)
        .then(res => {
            setPaginationPagesLimit(res.data[1].pages)
            setProductItems(res.data[0])   
            setFilteredProductItems(res.data[0])
        })
        .catch(err => {
            console.log(err)
        })
    }

    // TODO: Сделать реализацию применения всех фильтров
    const applyAllFilters = (diameters, lengths, productTypes, materials) => {
        
        for (let i = 0; i < filteredProductItems.length; i++) {
            let similarity = 0

            // diameter check
            if (diameters.length > 0) {
                for (let j = 0; j < diameters.length; j++) {
                    let productDiameter = filteredProductItems[i].diameter
                    let filterDiameter = diameters[j]
                    
                    if (productDiameter === filterDiameter) {
                        similarity += 1
                        break
                    }
                }
            } else {
                similarity += 1
            }

            // length check
            if (lengths.length > 0) {
                for (let j = 0; j < lengths.length; j++) {
                    let productLengths = filteredProductItems[i].length
                    let filterLengths = lengths[j]
                    
                    if (productLengths === filterLengths) {
                        similarity += 1
                        break
                    }
                }
            } else {
                similarity += 1 
            }

            // price check
            if (inputValue.from !== '' && inputValue.to !== '') {
                let productPrice = filteredProductItems[i].price
                
                if (productPrice >= inputValue.from && productPrice <= inputValue.to) {
                    similarity += 1 
                }
                
            } else {
                similarity += 1 
            }

            // ProductType check
            if (productTypes.length > 0) { 
                for (let j = 0; j < productTypes.length; j++) {
                    let productType = filteredProductItems[i].productType
                    let filterType = productTypes[j]
                    
                    if (productType === filterType) {
                        similarity += 1
                    }
                }
            } else {
                similarity += 1
            }

            // material check
            if (materials.length > 0) { 
                for (let j = 0; j < materials.length; j++) {
                    let productMaterial = filteredProductItems[i].material
                    let filterMaterial = materials[j]
                    
                    if (productMaterial === filterMaterial) {
                        similarity += 1
                    }
                }
            } else {
                similarity += 1
            }

            // Result
            if (similarity === 5) {
                if (!filteredProductItems.includes(newFilteredProductItems.current)) {
                    newFilteredProductItems.current.push(filteredProductItems[i])
                    console.log(newFilteredProductItems.current)
                }
            }
        }

        setFilteredProductItems(newFilteredProductItems.current)
    }

    const searchHandler = (e) => setSearchInputValue(e.target.value)
    
    const searchBtnHandler = () => {
        const newProductItems = productItems.filter(item => {
            const titleSimilarity = item.title.toLowerCase().includes(searchInputValue.toLowerCase())
            const descriptionSimilarity = item.description.toLowerCase().includes(searchInputValue.toLowerCase())

            return titleSimilarity || descriptionSimilarity
        })
        setFilteredProductItems(newProductItems)
    }

    useEffect(() => {
        if (searchInputValue !== '') {
            const newProductItems = productItems.filter(item => {
                return item.title.toLowerCase().includes(searchInputValue.toLowerCase())
            })
            setFilteredProductItems(newProductItems)
        } else {
            setFilteredProductItems(productItems)
        }
        
    }, [searchInputValue])

    useEffect(() => {
        getFilterData() // filter content
        getProductItems() // product items content
    }, [])

    useEffect(() => {
        getProductItems() // get new page 
    }, [paginationPage, paginationPagesLimit])

    return (
        <div className='main-products-section' style={{ margin: ( location.pathname === '/products' && "0px" ), padding: ( location.pathname === '/products' && "130px" ),  }}>
            <div className="container">
                <div className="main-products-section__inner">
                    <div className="main-products-section__header">
                        <div className="title">Каталог</div>
                        <div className="search">
                            <input value={searchInputValue} onChange={searchHandler} placeholder='Поиск' type="text" name="query" className='search__input' />
                            <img onClick={searchBtnHandler} className='search__btn' src={Search} alt="Найти" />
                        </div>
                    </div>
                    
                    <div className="main-products-section__body">
                        <div className="body__filter">
                            <div className="body__filter__inner">
                                {filterDataStatus ? (
                                    <>
                                        <FilterInputs inputValue={inputValue} setInputValue={setInputValue} filterTitle="Цены" />

                                        <FilterCheckboxes filterTitle="Диаметр, мм" checkboxItems={diameter} setFilterData={setDiameter} setFilterList={setFilterList} filterList={filterList} filterListTitle="diameter" />
                                        <FilterCheckboxes filterTitle="Тип товара" checkboxItems={productType} setFilterData={setProductType} setFilterList={setFilterList} filterList={filterList} filterListTitle="productType" />
                                        <FilterCheckboxes filterTitle="Материал" checkboxItems={material} setFilterData={setMaterial} setFilterList={setFilterList} filterList={filterList} filterListTitle="material" />
                                        <FilterCheckboxes filterTitle="Длина, м"  checkboxItems={length} setFilterData={setLength} setFilterList={setFilterList} filterList={filterList} filterListTitle="length" />
                                    </>
                                ) : (
                                    <Loader />
                                )}

                                <div className="body__filter-buttons">
                                    <div className="accept-all-filters" onClick={() => applyAllFilters(filterList.diameters, filterList.lengths, filterList.productsTypes, filterList.materials)}>Применить фильтры</div>
                                    <div className="clear-all-filters">Сбросить фильтры</div>
                                </div>
                            </div>
                        </div>

                        <div className="body__products">
                            {
                                filteredProductItems ? filteredProductItems.map(elem => {
                                    return <BusketItem
                                        key={elem.id}
                                        id={elem.id}
                                        img={ProductItemImgExample} 
                                        title={elem.title}
                                        description={elem.description}
                                        price={elem.price}
                                        diameter={elem.diameter}
                                        length={elem.length}
                                        material={elem.material}
                                        visualTypes={visualTypes}
                                    />
                                }) : (
                                    <Loader />
                                )
                            }

                            <div className="main-products-section__footer">
                                <Pagination paginationPagesLimit={paginationPagesLimit} paginationPage={paginationPage} setPaginationPage={setPaginationPage} />
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default MainProductsSection;
