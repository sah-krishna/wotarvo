"""create coutries tables

Revision ID: dbde02a6d068
Revises: b44802c171aa
Create Date: 2025-07-04 12:56:07.284501

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'dbde02a6d068'
down_revision: Union[str, Sequence[str], None] = 'b44802c171aa'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('countries',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('code', sa.String(length=2), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('code'),
    sa.UniqueConstraint('name')
    )
    op.create_index(op.f('ix_countries_id'), 'countries', ['id'], unique=False)
    op.add_column('cities', sa.Column('country_id', sa.Integer(), nullable=True))
    op.execute('UPDATE cities SET country_id = 1 WHERE country_id IS NULL')
    op.alter_column('cities', 'country_id', nullable=False)
    op.create_foreign_key('fk_cities_country', 'cities', 'countries', ['country_id'], ['id'])
    op.drop_column('cities', 'country')
    op.drop_column('cities', 'country_code')
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('cities', sa.Column('country_code', sa.VARCHAR(length=2), autoincrement=False, nullable=True))
    op.add_column('cities', sa.Column('country', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.drop_constraint('fk_cities_country', 'cities', type_='foreignkey')
    op.drop_column('cities', 'country_id')
    op.drop_index(op.f('ix_countries_id'), table_name='countries')
    op.drop_table('countries')
    # ### end Alembic commands ###
