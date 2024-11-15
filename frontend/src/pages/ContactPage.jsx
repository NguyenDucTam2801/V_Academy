import React from 'react'
import { useForm } from 'react-hook-form';
import '../styles/pages/ContactPage.css';
import { NavBar } from '../components/outside/NavBar';
import Footer from '../components/outside/Footer';
import background from "../assets/background.jpg";

export default function ContactPage() {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const onSubmit = (data) => {
        alert(JSON.stringify(data, null, 2));
      };

  return (
    <div style={
        {
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed"
        }
      }>
        <NavBar/>
        <div className="register-container" >
            <h2>Register for education</h2>
            <p>Please complete the form below. V-academy will contact you to answer any questions, completely free of charge.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                <div className="form-row">
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="Full name"
                    {...register('fullName', { required: 'Full name is required' })}
                    />
                    {errors.fullName && <span className="error">{errors.fullName.message}</span>}
                </div>
                <div className="form-group">
                    <input
                    type="email"
                    placeholder="Email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: 'Invalid email address',
                        },
                    })}
                    />
                    {errors.email && <span className="error">{errors.email.message}</span>}
                </div>
                </div>
                <div className="form-row">
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="Phone number"
                    {...register('phone', {
                        required: 'Phone number is required',
                        pattern: {
                        value: /^\d{10}$/,
                        message: 'Invalid phone number (10 digits required)',
                        },
                    })}
                    />
                    {errors.phone && <span className="error">{errors.phone.message}</span>}
                </div>
                <div className="form-group">
                    <input
                    type="date"
                    placeholder="Birthday"
                    {...register('birthday', { required: 'Birthday is required' })}
                    />
                    {errors.birthday && <span className="error">{errors.birthday.message}</span>}
                </div>
                </div>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="Address"
                    {...register('address', { required: 'Address is required' })}
                />
                {errors.address && <span className="error">{errors.address.message}</span>}
                </div>
                <div className="form-group">
                <textarea
                    placeholder="Additional description"
                    {...register('description')}
                />
                </div>
                <button type="submit" className="submit-button">Register</button>
            </form>
        </div>
        <Footer/>
    </div>
  )
}
