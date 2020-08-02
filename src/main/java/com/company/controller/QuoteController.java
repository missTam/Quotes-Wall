package com.company.controller;

import com.company.model.Quote;
import com.company.service.QuoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/quotes")
@RestController
public class QuoteController {

    @Autowired
    private QuoteService quoteService;

    @GetMapping
    public List<Quote> getAllQuotes() {
        return quoteService.getAllQuotes();
    }

    @RequestMapping("/{id}")
    public Quote getQuote(@PathVariable int id) {
        return quoteService.getQuote(id);
    }

    @RequestMapping(
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Quote> addQuote(@RequestBody Quote quote) {
        return new ResponseEntity<Quote>(quoteService.addQuote(quote), HttpStatus.CREATED);
    }

    @RequestMapping(
            value="/{id}",
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Quote> updateQuote(@RequestBody Quote quote, @PathVariable int id) {
        return new ResponseEntity<Quote>(quoteService.updateQuote(id, quote), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    public void deleteQuote(@PathVariable int id) {
        quoteService.deleteQuote(id);
    }
}
