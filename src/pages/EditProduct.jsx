import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  //!Navigate
  const navigate = useNavigate()
  //!Navigate

  //?UseState
  const [preview, setPreview] = useState("")
  const [image, setImage] = useState(null)
  const [product, setProduct] = useState({})
  //?UseState

  //!Params
  const { productId } = useParams()
  //!Params

  //?GetSingle Product 
  useEffect(() => {
    const getSingleProduct = async () => {
      await axios
        .get(`${process.env.REACT_APP_ALL_DATA}/${productId}`)
        .then(res => {
          setProduct(res.data);
        }).catch(err => {
          console.log(err);
        })
    };
    getSingleProduct()
  }, [productId])
  

  //?GetSingle Product 

  //!Get Photo
  const handleImage = (e) => {
    let file = e.target.files[0]
    setImage(file)
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setPreview(reader.result);
      setImage(reader.result)
    };
    reader.onerror = function (error) {
      console.log(error);
    }
  }
  //!Get Photo


  //? React Hook Form
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: product.name,
      details: product.details,
      price: product.price,
    }
  });
  //? React Hook Form


  const onSubmit = async (data) => {
    const body = new FormData()
    body.append("name", data.name)
    body.append("details", data.details)
    body.append("price", data.price)
    body.append("productImage", image)

    await axios.put(`${process.env.REACT_APP_ALL_DATA}/${productId}`, body)
      .then(res => {
        console.log(res)
        navigate("/all-product")
      }).catch(err => {
        console.log(err);
      })
  }


  return (
    <section className="editProduct">
      <div className="container">
        <div className="row">
          <h2 className="title">Edit Product's data</h2>
          <div className="login-box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="user-box">
                <input type="text" name="name" defaultValue={product.name} {...register("name")} />
                <label>Product Name</label>
              </div>
              <div className="user-box">
                <input type="text" name="details" defaultValue={product.details} {...register("details")} />
                <label>Product Details</label>
              </div>
              <div className="user-box">
                <input type="text" name="price" defaultValue={product.price} {...register("price")} />
                <label>Product Price</label>
              </div>
              <div className="user-box">
                <input type="file" name="productImage" id="pImg" onChange={handleImage} />
                {preview ? (
                  <div className="previewImage">
                    <img src={preview} alt="old-img" />
                  </div>
                ) : (
                  <div className="previewImage">
                    {
                      product.productImage && <img src={`${process.env.REACT_APP_BASE}${product.productImage}`} alt="new-img" />
                    }
                  </div>
                )
                }
              </div>
              <div className="btn">
                <button>
                  Edit Product
                  <span></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProduct;
