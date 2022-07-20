import 'bootstrap/dist/css/bootstrap.css'

export default function InputText(props){
    return  <div>
            <input className='mb-2 mt-2 form-control' type={props.type} placeholder={props.placeholder} onChange={props.onChange}/>
        </div>
    
}
