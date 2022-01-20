import React from "react";
import { IoFilter } from "react-icons/io5";
import styles from "./styles/ProductFilter.module.scss";

interface ProductFilterProps {
  handleFilterConditionClick: (e: React.FormEvent<HTMLButtonElement>) => void;
  handleFilterChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleApplyFilterClick: () => void;
  elementToFilter?: string;
  filterValue?: string;
  condition?: string;
}

export function ProductFilter({
  handleFilterConditionClick,
  handleApplyFilterClick,
  handleFilterChange,
  elementToFilter,
  filterValue,
  condition,
}: ProductFilterProps) {
  return (
    <div className={styles.filterContainer}>
      <h3>Filter</h3>
      <div className={styles.filter}>
        <div className={styles.inputs}>
          <div>
            <h5>Element</h5>
            <input
              value={elementToFilter}
              name="elementToFilter"
              onChange={handleFilterChange}
              placeholder="Element to filter"
            />
          </div>
          <div>
            <h5>Value</h5>
            <input
              value={filterValue}
              name="filterValue"
              onChange={handleFilterChange}
              placeholder="Filter value"
            />
          </div>
        </div>
        <div>
          <h5>Condition</h5>
          <div className={styles.operators}>
            <button
              id="greater"
              className={
                condition == "greater" ? styles.selected : styles.conditionButton
              }
              onClick={handleFilterConditionClick}
            >
              {">"}
            </button>
            <button
              id="lesser"
              className={
                condition == "lesser" ? styles.selected : styles.conditionButton
              }
              onClick={handleFilterConditionClick}
            >
              {"<"}
            </button>
            <button
              id="different"
              className={
                condition == "different"
                  ? styles.selected
                  : styles.conditionButton
              }
              onClick={handleFilterConditionClick}
            >
              {"!="}
            </button>
            <button
              id="greater_or_equal"
              className={
                condition == "greater_or_equal"
                  ? styles.selected
                  : styles.conditionButton
              }
              onClick={handleFilterConditionClick}
            >
              {">="}
            </button>
            <button
              id="lesser_or_equal"
              className={
                condition == "lesser_or_equal"
                  ? styles.selected
                  : styles.conditionButton
              }
              onClick={handleFilterConditionClick}
            >
              {"<="}
            </button>
            <button
              id="equal"
              className={
                condition == "equal" ? styles.selected : styles.conditionButton
              }
              onClick={handleFilterConditionClick}
            >
              {"="}
            </button>
          </div>
        </div>
        <button id={styles.applyFilterButton} onClick={handleApplyFilterClick}>
          Apply filter <IoFilter id={styles.filterIcon} />
        </button>
      </div>
    </div>
  );
}
