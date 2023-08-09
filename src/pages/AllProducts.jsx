import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

//Sweet alert
import Swal from 'sweetalert2'


const AllProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_ALL_DATA);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Delete Product from Backend
  const removeProduct = async (productID) => {
    Swal.fire({
      title: 'Ürün silmek istediyinizden eminmisiniz?',
      text: "Silinen ürün geri gelmeyecek!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sil',
      cancelButtonText: 'Vazgeç',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete(`${process.env.REACT_APP_ALL_DATA}/${productID}`)
          .then((res) => {
            setData(res.data);
          })
          .catch(err => {
            console.log(err);
          })
        Swal.fire(
          'Ürün Silindi!',
          'Başarılı'
        )
      }
    });
  };

  return (
    <section className="allProducts">
      <div className="container">
        <div className="row">
          <h2 className="title">All Products List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Product Details</th>
                <th>Product Price</th>
                <th>Edit Product</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="productImg">
                    <img src={`${process.env.REACT_APP_BASE}${item.productImage}`} alt={item.name} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.details}</td>
                  <td>{item.price}₺</td>
                  <td className="edit">
                    <Link to={`/edit-product/${item.id}`}>
                      <FaEdit />
                    </Link>
                    <FaTrash onClick={() => removeProduct(item.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
