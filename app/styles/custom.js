import styled from '@emotion/styled';

export const Container = styled('div')`
  max-width: 1200px;
  margin: 0 auto;
`;

export const TitleApp = styled('h1')`
  color: #333;
  text-align: center;
  font-size: "22px";
`;

export const CityTitle = styled('h2')`
  color: coral;
`;

export const CityList = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const City = styled('div')`
  width: 15vw;
  min-width: 200px;
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  background-color: aliceblue;
  margin: 10px;
  border-radius: 2px;
`;

export const CityWeather = styled('div')`
  text-align: center;
`;
