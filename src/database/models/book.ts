import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Book extends Model {
  @Column
  name: string;

  @Column
  author: string;
}