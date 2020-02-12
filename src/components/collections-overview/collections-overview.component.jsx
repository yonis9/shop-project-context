import React, { useContext } from 'react';

import CollectionsContext from '../../contexts/collections/collections.context';

import CollectionPreview from '../collection-preview/collection-preview.component';

import './collections-overview.styles.scss';

const CollectionsOverview = () => {
  const collecionsObject = useContext(CollectionsContext);
  const collections = Object.keys(collecionsObject).map(key => collecionsObject[key])
  return (
  <div className='collections-overview'>
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
)};


export default CollectionsOverview;
