package com.company.service;

import com.company.model.Quote;
import com.company.repository.QuoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service
public class QuoteService {

    @Autowired
    private QuoteRepository quoteRepository;

    public List<Quote> getAllQuotes() {
        List<Quote> quotes = new ArrayList<>();
        quoteRepository.findAll().forEach(quotes::add);
        return quotes;
    }

    public Quote getQuote(int id) {
        return quoteRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public Quote addQuote(Quote quote) {
        return quoteRepository.save(quote);
    }

    public Quote updateQuote(int id, Quote quote) {
        Quote foundQuote = quoteRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        foundQuote.setContent(quote.getContent());
        foundQuote.setTitle(quote.getTitle());
        return quoteRepository.save(foundQuote);
    }

    public void deleteQuote(int id) {
       quoteRepository.findById(id).orElseThrow(EntityNotFoundException::new);
       quoteRepository.deleteById(id);
    }
}
