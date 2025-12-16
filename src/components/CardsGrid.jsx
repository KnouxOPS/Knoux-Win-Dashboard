import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  padding: 10px;
`;

export default function CardsGrid({ scripts }) {
  return (
    <GridContainer>
      {scripts.map((script, index) => (
        <Card key={index} script={script} />
      ))}
    </GridContainer>
  );
}