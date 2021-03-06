export const Input = (props: any) => {
    return (
        <>
            {props.type === "text" && <label htmlFor="" className="mt-2">{props.labelText}</label>}
            <input className="form-control w-25 mb-2" name={props.name} type={props.type}
                value={props.value} onChange={props.onChange} />
        </>
    )
}
