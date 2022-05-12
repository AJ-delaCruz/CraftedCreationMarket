
import Products from "./Products";
import styled from "styled-components";
import {useLocation} from "react-router";
import {useState} from "react";
import {useSelector} from "react-redux";
// import {useState} from "react";
// import {useLocation} from "react-router";

const Container = styled.div``;


const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;

const ProductList = () => {
    const location = useLocation();
    console.log(location);
    const cat = location.pathname.split("/")[2];
    console.log("cat " +cat);
    // console.log(location.pathname.split("/")[1]);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest");

    //from redux store
    const searchProduct = useSelector(state => state.search.product);
    console.log("search? = " + searchProduct);

    const handleFilters = (e) => {
        const value = e.target.value;
        console.log(value);
        setFilters({
            ...filters,
            [e.target.name]: value,
        });
    };
    console.log(filters);
    return (

        <div>

            <div>Hello</div>
            <Title>{cat}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select name="Color" onChange={handleFilters}>
                        <Option disabled>Color</Option>
                        {/*<Option value = "White">White</Option>*/}
                        <Option>White</Option>

                        <Option>Black</Option>
                        <Option>red</Option>
                        <Option>blue</Option>
                        <Option>Yellow</Option>
                        {/*<Option value = "Yellow">Yellow</Option>*/}

                        <Option>green</Option>
                    </Select>
                    <Select name="Size" onChange={handleFilters}>
                        <Option disabled>Size</Option>
                        <Option value="S">S</Option>
                        <Option value="M">M</Option>
                        <Option value="L">L</Option>

                    </Select>
                </Filter>

                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select onChange={(e) => setSort(e.target.value)}>
                        <Option value="newest">Newest</Option>
                        <Option value="asc">Price (asc)</Option>
                        <Option value="desc">Price (desc)</Option>
                    </Select>
                </Filter>

            </FilterContainer>


            {/*<Products/>*/}
            {/*{(typeof searchProduct === 'string') ? <Products categories={cat} filters={filters} sort={sort} searchValue={searchProduct}/> :*/}
            {/*    <Products categories={cat} filters={filters} sort={sort} />*/}
            <Products categories={cat} filters={filters} sort={sort} searchValue={searchProduct}/>
            }
        </div>
    );
};

export default ProductList;


// import Products from "./Products";
//
// const ProductList= () => {
//     return (
//         <Products/>
//     );
// };
// export default ProductList;