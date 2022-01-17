import { ProductsMetaEntity } from '../../core/domain/entities/products_meta_entity';
import styles from './styles/ProductsInfo.module.scss';

interface ProductsInfoProps {
  meta: ProductsMetaEntity
}

export function ProductsInfo({meta}: ProductsInfoProps) {
  return (
    <div className={styles.infoContainer}>
      <h3>Info</h3>
      <div className={styles.info}>
        <div>
          <h5>Current page</h5>
          <h4>{meta.current_page}</h4>
        </div>
        <div>
          <h5>Total pages</h5>
          <h4>{meta.total_pages}</h4>
        </div>
        <div>
          <h5>Total products</h5>
          <h4>{meta.total_items}</h4>
        </div>
        <div>
          <h5>Filtered products</h5>
          <h4>{meta.total_items_filtered}</h4>
        </div>
        <div>
          <h5>Products per page</h5>
          <h4>{meta.items_per_page}</h4>
        </div>
      </div>
    </div>
  );
}
