package ca.mcgill.ecse428.potatopeeps.diningsession;

import ca.mcgill.ecse428.potatopeeps.order.Order;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@Entity
public class DiningSession implements Serializable {

    private static final long serialVersionUID = 1132661429342356175L;

    public DiningSession() {
    }

    public DiningSession(Integer tableNumber) {
        this.tableNumber = tableNumber;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="date")
    private LocalDateTime date;

    @Column(name="price")
    private Double price;

    @Column(name="table_number")
    private Integer tableNumber;

    @Column(name="status")
    private String status;

    @OneToMany(mappedBy="diningSession")
    private Set<Order> orders;
    
    public void addOrder(Order o) {
    	//TODO validate order
    	orders.add(o);
    }
    
}
