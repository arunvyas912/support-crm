from sqlalchemy.orm import Session
from models import Ticket
import random

def generate_ticket_id():
    return f"TKT-{random.randint(1000,9999)}"

def create_ticket(db: Session, ticket):
    db_ticket = Ticket(
        ticket_id=generate_ticket_id(),
        customer_name=ticket.customer_name,
        customer_email=ticket.customer_email,
        subject=ticket.subject,
        description=ticket.description,
        status="Open",
        notes=""
    )

    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)

    return db_ticket


def get_tickets(db: Session, search=None, status=None):
    query = db.query(Ticket)

    if search:
        query = query.filter(
            Ticket.customer_name.contains(search) |
            Ticket.customer_email.contains(search) |
            Ticket.subject.contains(search)
        )

    if status:
        query = query.filter(Ticket.status == status)

    return query.all()


def get_ticket(db: Session, ticket_id: str):
    return db.query(Ticket).filter(
        Ticket.ticket_id == ticket_id
    ).first()


def update_ticket(db: Session, ticket_id, data):
    ticket = get_ticket(db, ticket_id)

    if ticket:
        ticket.status = data.status
        ticket.notes = data.notes

        db.commit()
        db.refresh(ticket)

    return ticket