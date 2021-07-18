import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";

import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import { getTopRatedProducts } from "../../actions/productActions";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector(state => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(getTopRatedProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Carousel pause='hover' className='bg-dark mt-2'>
          {products.map(product => {
            return (
              <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}>
                  <Image src={product.image} alt={product.name} fluid />
                  <Carousel.Caption className='carousel-caption'>
                    <h2>
                      {product.name} (${product.price})
                    </h2>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            );
          })}
        </Carousel>
      )}
    </>
  );
};

export default ProductCarousel;
