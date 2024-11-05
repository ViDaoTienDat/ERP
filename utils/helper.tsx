function convertDateFormat(dateString: string): string {

    const datePart = dateString.split(", ")[1]; // "05/11/2024"
    
    const [day, month, year] = datePart.split("/");
  
    return `${year}-${month}-${day}`;
}
export default convertDateFormat  