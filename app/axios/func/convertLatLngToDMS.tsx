function toDMS(deg: number) {
    const absolute = Math.abs(deg);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(2);
  
    return `${degrees}°${minutes}'${seconds}"`;
  }
  
export function convertLatLngToDMS(position: number[]) {
    const latitude = toDMS(position[1]);
    const latitudeCardinal = position[1] >= 0 ? 'B' : 'N';
  
    const longitude = toDMS(position[0]);
    const longitudeCardinal = position[0] >= 0 ? 'Đ' : 'T';
  
    return {
      latitude: `${latitude} ${latitudeCardinal}`,
      longitude: `${longitude} ${longitudeCardinal}`
    };
  }