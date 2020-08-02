package com.company.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "quotes")
public class Quote {

    @Id
    @GeneratedValue
    private int id;

    @Size(max = 60)
    @NotNull
    private String title;

    @Size(max = 300)
    @NotNull
    private String content;

    public Quote() {}

    public Quote(int id, String title, String content) {
        this.id = id;
        this.title = title;
        this.content = content;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
